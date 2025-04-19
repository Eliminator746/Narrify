import { Auth } from "../components/Auth"
import { Blog } from "./Blog"

const Signup = () => {
  return (
    <div className="grid grid-cols-2"> 
      <div> <Auth type="signup"/> </div>
      <div className="invisible md:visible">< Blog /> </div>
    </div>
  )
}
export { Signup }