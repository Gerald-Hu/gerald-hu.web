import Home from "@/components/home";
import { getPhotoUrl, listPhotos } from "@/firebase/db/photo";

export default async function App() {
  const photosPromise = listPhotos("photos");
  const actionImageUrlPromise = getPhotoUrl("projects/3.png");

  const [
    photos,
    actionImageUrl,
  ] = await Promise.all([
    photosPromise,
    actionImageUrlPromise,
  ]);

  return (
    <Home
      actionImageUrl={actionImageUrl}
      photos={photos}
    />
  );
}
