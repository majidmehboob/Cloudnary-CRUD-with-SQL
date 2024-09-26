export const dynamic = "force-dynamic";
export const getAllFile = async () => {
    try {
      const res = await fetch(`https://cloudnary-crud-with-sql-dbdy.vercel.app/api/GET`, {
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
      const res = await fetch(`https://cloudnary-crud-with-sql-dbdy.vercel.app/api/POST`, {
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
      const res = await fetch(`https://cloudnary-crud-with-sql-dbdy.vercel.app/api/DELETE`, {
        method: 'DELETE',
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
  
  export const editFile = async (file) => {
    try {
      const res = await fetch(`https://cloudnary-crud-with-sql-dbdy.vercel.app/api/UPDATE`, {
        method: 'PUT',
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
  