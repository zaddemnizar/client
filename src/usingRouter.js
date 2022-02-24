import { useParams } from 'react-router-dom';

export function usingRouter(Child) {
  return (props) => {
    const params = useParams();
    return <Child {...props} params={params} />;
  }
}