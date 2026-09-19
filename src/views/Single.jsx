import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return (
      <div>
        <p>No media item selected.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </p>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      {item.media_type.includes('video') ? (
        <video src={item.filename} controls width="100%" />
      ) : (
        <img src={item.filename} alt={item.title} style={{maxWidth: '100%'}} />
      )}
    </div>
  );
};

export default Single;
