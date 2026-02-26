import { read } from "fs";
import fs from "fs/promises";
// const data = fs.readFileSync("data.txt", "utf-8");
// console.log("Data=", data);
// fs.appendFileSync("data.txt", "\nNew data added");
// const data1= fs.readFileSync("data.txt", "utf-8");
// console.log("Data after append=", data1);
// fs.unlinkSync("data.txt");


// fs.readFile("data.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err.message);
//   }
//   else {
//   console.log("Data=", data);
//   }
//   const myData = "\nNew data added";
//   fs.writeFile("data.txt", myData, (err) => {
//     if (err) {
//       console.error("Error writing file:", err.message);
//     }
//     else {
//       console.log("Data written successfully");
//     }
//   });
// });


async function readData() {
      try{
            const data=await fs.readFile("data.txt", "utf-8")
            console.log("Data=", data);
      }catch(err){
            console.error("Error reading file:", err.message);
      }
}
readData();
async function saveData(myData) {
      try{
            fs.writeFile("data.txt", "\nNew data added")
            console.log("Data written successfully");
      }
      catch(err){
            console.error("Error writing file:", err.message);
      }
}
const myData = "\nNew data added";
saveData(myData);
readData();