import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.user_id}
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
