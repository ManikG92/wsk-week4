import {useLocation, useNavigate} from 'react-router';

const SingleView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return <p>No item found.</p>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>
        Uploaded by: <strong>{item.username}</strong>
      </p>
      {item.media_type.includes('video') ? (
        <video src={item.filename} controls width="400" />
      ) : (
        <img src={item.filename} alt={item.title} width="400" />
      )}
      <p>{item.description}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default SingleView;
