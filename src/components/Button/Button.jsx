const Button = ({ loadeMore }) => {
  return (
    <button onClick={loadeMore} className="button" type="button">
      Load more
    </button>
  );
};

export default Button;
