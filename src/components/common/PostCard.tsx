export default function PostCard() {
  return (
    <div className="h-[450px] w-[300px] rounded-md bg-primary-content p-2">
      <figure>
        <img
          className="h-[300px] w-full rounded-md object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Big_%26_Small_Pumkins.JPG/2560px-Big_%26_Small_Pumkins.JPG"
          alt="post"
        />
      </figure>
    </div>
  );
}
