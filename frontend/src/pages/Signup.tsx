import { Auth } from "../components/Auth"
import { Blog } from "./Blog"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2"> 
      <div> <Auth type="signup"/> </div>
      <div className="hidden md:block">< Blog /> </div>
    </div>
  )
}
export { Signup }