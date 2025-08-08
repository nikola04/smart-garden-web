import { Link } from "react-router"

function Home(){
    return <div>
        <h1>Home</h1>
        <Link to="/project/select-project">Projects</Link>
    </div>
}

export default Home
