import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
const LoadingButton = () => {
  return (
    <div>
         <FontAwesomeIcon icon={faRefresh} spin /> Loading...
    </div>
  )
}
export default LoadingButton