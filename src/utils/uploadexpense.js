// code funcitonality --- 

// 1. reader banaya
// 2. onload me bataya → read hone ke baad kya karna hai
// 3. readAsText(file) → actual file read start
// 4. read complete → onload function execute

export const uploadexpense = (e,uploadToServer) =>{

  const file = e.target.files[0];
 
   if(!file) {
return
   }

       const reader = new FileReader();

    //    onload funciton execute 
       reader.onload =(event)=>{
        const text =event.target.result;

        const rows = text.split('\n').map(row=>row.split(','));

         const data = rows.slice(1);

         const expenses= data.filter(row=>row.length>=4 && row[0]!='').map(row=>({
            amount:Number(row[0]),
            category:row[1],
            type:row[2],
            date: new Date().toLocaleDateString()
         }))

       
       
       
        
        uploadToServer(expenses);

       }


    //    read file after complete the reading , triger event above funtion
       reader.readAsText(file);
  

}

