import { Auth } from "../components/Auth"
import { Blog } from "./Blog"

const Signin = () => {
  return (
    <div className="grid grid-cols-2">
      <div> <Auth type="signin" /> </div>
      <div className="invisible md:visible">< Blog /> </div>
    </div>
  )
}
export { Signin }