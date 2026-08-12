export const downlaodreport=(data)=>{

    console.log('downl');
    console.log(data);
    
    const header = ['Amount','Category','Type','Date'];

    // object to array
    const row = data.map((item)=>[
        item.amount,
        item.category,
        item.type,
        item.date
    ])

    //  header and row in one array and make it csv format via and break line
    const csvContent = [header, ...row].map(row=>row.map(it=>`${it}`).join(',')).join('\n');
    
    // create a file
    const blob = new Blob([csvContent],{type: "text/csv"})

    // create a browser temp url
    const url = window.URL.createObjectURL(blob)
    const a  = document.createElement('a');
    a.href = url;
    a.download = 'Expensereport.csv';
    a.click();
    // Removes temporary URL from memory
    window.URL.revokeObjectURL(blob)

   
  
}