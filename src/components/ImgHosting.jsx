import axios from "axios";


const imgHosting=async(imgArray)=>{
    if (!imgArray[0]) {
        alert("Please upload a company logo");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", imgArray[0]);

      try {
        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            params: {
              key: import.meta.env.VITE_API_KEY,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const url= await imgbbResponse.data.data.url;
        return url
        
  
    } catch (error) {
        console.error("Error uploading image to imgbb:", error);
      }

      

    
}

export default imgHosting;