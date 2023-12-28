export default function slugGenerator(text){
   return text.split(" ").join("-")
}