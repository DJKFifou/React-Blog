export default function Home() {

    fetch('https://dummyjson.com/test')
    .then(res => res.json())
    .then(console.log);

    return (
        <>

        </>
    )
}