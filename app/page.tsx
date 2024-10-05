"use client";
import React,{ useState, useEffect } from 'react';
import { getAllFile, putNewFile, deleteFile, editFile } from '@/app/services/index';
import { CldUploadWidget } from 'next-cloudinary';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Model from '@/app/components/modelfile';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState<{ url: string; format: string } | null>(null);
  const [model, setModel] = useState<boolean>(false);
  const [result, setResult] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);
  const [hover, setHover] = useState<number | null>(-1);
  const [file, setFile] = useState<number>(0);
  const [realData, setRealData] = useState<any[]>([]);
  const [text, setText] = useState<string>('');
  const [recognition, setRecognition] = useState<any | null>(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 2]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (url) {
      putFile();
    }
  }, [url]);

  useEffect(() => {
    // Initialize SpeechRecognition if available
    const initRecognition = () => {
      if ('webkitSpeechRecognition' in window) {
        const recognitionInstance = new (window as any).webkitSpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setText(transcript.toLowerCase());
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };

        setRecognition(recognitionInstance);
        recognitionInstance.start();
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    };

    initRecognition();
  }, []);

  useEffect(() => {
    // Voice command processing
    if (text.includes('show all')) {
      setFile(0);
    } else if (text.includes('show videos')) {
      setFile(1);
    } else if (text.includes('show images')) {
      setFile(2);
    }
  }, [text]);

  async function fetchData() {
    const response = await getAllFile();
    console.log(response,"RESPONSE")
    if (response.sucess) {
      setResult(response.data);
      setRealData(response.data);
    }
  }

  async function putFile() {
    const response = await putNewFile(url);
    if (response.sucess) {
      fetchData();
      setUrl(null);
    }
  }

  async function handleDelete(data: any) {
    const response = await deleteFile(data);
    if (response.sucess) {
      fetchData();
    }
  }

  async function handleEdit(data: any) {
    setModel(true);
    setEditData({ data, status: false });
  }

  async function handleEditFunction(editData: any) {
    const response = await editFile(editData);
    if (response.sucess) {
      setModel(false);
      fetchData();
    }
  }

  function getIndexFunction(index: number) {
    if (index === 0 || index === 7 || index === 9) {
      return 'md:col-span-2 md:row-span-2';
    }
  }

  return (
    <div>
      {model && (
        <Model
          setModel={setModel}
          editData={editData}
          setEditData={setEditData}
          HandleEditFunction={handleEditFunction}
        />
      )}
      <div className="sticky top-0 z-50">
        <motion.div
          className="shadow-md min-h-xl md:pb-10 pb-2 bg-white text-left p-5 flex justify-between gap-2 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CldUploadWidget
            uploadPreset="todo_app"
            onSuccess={(info: any) => {
              setUrl({ url: info?.secure_url, format: info?.resource_type });
            }}
          >
            {({ open }) => (
              <button
                className="text-md p-2 bg-green-400 text-white lowercase rounded-md w-full md:w-auto"
                onClick={()=>{open}}
              >
                {!url ? 'Upload File' : 'Loading'}
              </button>
            )}
          </CldUploadWidget>
        </motion.div>

        <motion.div
          className="md:p-3 p-2 rounded-es-3xl md:rounded-none rounded-ee-3xl flex justify-center md:gap-10 gap-5 bg-white mb-10 md:w-[50%] w-full md:absolute md:right-0 md:before:bg-white shadow-xl md:before:h-full md:before:w-[80px] md:before:skew-x-[45deg] md:before:bottom-0 md:before:absolute before:-left-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={() => setFile(0)}
            className={`${file === 0 ? 'bg-green-500 text-white' : 'text-green-500 bg-white'} p-1 rounded-sm uppercase text-lg font-thin font-mono`}
          >
            All
          </button>
          <button
            onClick={() => setFile(1)}
            className={`${file === 1 ? 'bg-green-500 text-white' : 'text-green-500 bg-white'} p-1 rounded-sm uppercase text-lg font-thin font-mono`}
          >
            Videos
          </button>
          <button
            onClick={() => setFile(2)}
            className={`${file === 2 ? 'bg-green-500 text-white' : 'text-green-500 bg-white'} p-1 rounded-sm uppercase text-lg font-thin font-mono`}
          >
            Images
          </button>
        </motion.div>
      </div>
      <AnimatePresence>
        <motion.div className="text-bold text-2xl px-4 py-2 text-green-500   bg-white shadow-md" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>
            Gallery Store Application
          </motion.div>
        <motion.div
          className="overflow-y-hidden py-10 grid md:grid-cols-3 grid-cols-1 gap-3 md:px-10 px-5 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          
          {result.length > 0 ? (
            result.map((item: any, index: number) =>
              file === 0 || (file === 1 && item.format === 'video') || (file === 2 && item.format === 'image') ? (
                <motion.div
                  key={index}
                  className={`${getIndexFunction(index)} cursor-pointer relative transition-all duration-100 delay-100 hover:scale-90`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}>
                    {item.format === 'image' ? (
                      <motion.img
                        src={item.url}
                        alt="img"
                        className="w-full bg-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <motion.video
                        className="w-full h-full"
                        controls
                        autoPlay
                        loop
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <source src={item.url} type="video/mp4" />
                      </motion.video>
                    )}
                    {hover === index && (
                      <motion.div
                        className="absolute bottom-2 left-2 flex justify-center items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaEdit onClick={() => handleEdit(item)} className="text-3xl text-green-500 bg-white rounded-full p-1" />
                        <MdDelete onClick={() => handleDelete(item)} className="text-3xl text-green-500 bg-white rounded-full p-1" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : null
            )
          ) : (
            <motion.h1
              className="text-xl text-center animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            >
              Fetching your data...
            </motion.h1>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
