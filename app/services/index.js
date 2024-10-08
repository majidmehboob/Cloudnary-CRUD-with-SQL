export const dynamic = "force-dynamic";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // Development API URL (localhost)
    : "https://image-storage-gallery.vercel.app/"; // Production API URL (your Vercel deployment)
export const getAllFile = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/GET`, {
        method: 'GET',
        cache: 'no-store',
        next:{
          revalidate:10
        },
      });
       //res.headers.set('Cache-Control', 'no-store');
      const data = await res.json();
    
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const putNewFile = async (file) => {
    try {
      const res = await fetch(`/api/POST`, {
        method: 'POST',
        body: JSON.stringify(file),
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteFile = async (file) => {
    try {
      const res = await fetch(`${baseUrl}/api/DELETE`, {
        method: "DELETE",
        body: JSON.stringify(file),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const editFile = async (file) => {
    try {
      const res = await fetch(`${baseUrl}/api/UPDATE`, {
        method: "PUT",
        body: JSON.stringify(file),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  