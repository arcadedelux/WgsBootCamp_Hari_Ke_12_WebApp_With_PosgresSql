
const fs = require('fs')
const validator = require('validator')
const pool =require('../config/db')

// Inisiasi Node readline
// const readline = require('readline')

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })

  


//Untuk Menampilkan/Load Data File Contacts.json
 async function loadContactDb(){
  try {
    const file = await pool.query(`SELECT name, phone, email
    FROM public."contactapp"`)
        return file.rows
  } catch(err) {
    console.log(err)
  }
}
 
//Fungsi Mencari Duplikat nama dalam database
async function copyDb (name){
  const contacts= await loadContactDb()
  const checkName= contacts.find(e=> e.name === name)
  return checkName
} 

//Untuk menyimpan Data File Contacts.json
async function saveContactDb(data){
  try{
    newCont =await pool.query(`INSERT INTO ContactApp values('${data.name}','${data.phone}','${data.email}') RETURNING *`)
  }catch(err){

  }
  
}

  //Fungsi Menampilkan Detai Contact Bedasarkan Nama dari PostgresDb
  async function detailContactDb(name){
    try{
      const contacts= await loadContactDb()
      const details = contacts.find(e=>e.name === name)
  
      if(!details){
        console.log(`${name} Tidak ditemukan`)
        return false
      }
      return details
    }catch(err){
      console.log(err)
    }
   
  //  for(elem in details){
  //   console.log(`${elem} : ${details[elem]}`)
  //  }
  }

  //Delete contact from Db
  async function deleteContactDb(name){
  await pool.query(`DELETE FROM public.contactapp WHERE name ='${name}'`)
 }
   
  
  //Fungsi Update Contact
  async function updateContactDb (newContact,oldName){
    try{
      const contacts= await loadContactDb()
      const key =newContact.oldName
      const details = contacts.find(e=>e.name === key)
  
      if(details){
        details.name = newContact.name
      
        details.phone = newContact.phone
       
        details.email =newContact.email
  
        await pool.query(`UPDATE public.contactapp
        SET name='${details.name}', phone='${details.phone}', email='${details.email}'
        WHERE name ='${oldName}';`)
        
      }
    }catch(err){
      console.log(err)
    }
    
     
  }
  // const updateContact =(newContact)=>{
  //   const contacts= loadContact()
  //   //fungsi menghilangkan contact lama yang namanya sama dengan oldName
  //   const details = contacts.filter(contact=>contact.name !== newContact.oldName)
  //   delete newContact.oldName

  //   details.push(newContact)

  //  fs.writeFileSync('data/contacts.json',JSON.stringify(details))
  // }
module.exports={loadContactDb,detailContactDb,copyDb,saveContactDb,deleteContactDb,updateContactDb }