import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open={!!item}>
      <p>
        <button onClick={() => setSelectedItem(null)}>Close</button>
      </p>
      {item && (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls width="100%" />
          ) : (
            <img
              src={item.filename}
              alt={item.title}
              style={{maxWidth: '100%'}}
            />
          )}
        </>
      )}
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
