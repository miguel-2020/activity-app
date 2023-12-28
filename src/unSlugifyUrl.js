export default function unSlugifyUrl(text){
    return text.split("-").join(" ")
}