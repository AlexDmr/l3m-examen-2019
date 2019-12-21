import {toUINT, UINT} from '../data/definitions';

interface Etudiant {
  id: number;
  nom: string;
}
declare function getPromotion(nom: string): Promise<Etudiant[]>;
declare function getPhoto(id: UINT): Promise<ImageData>;
declare function getImageComposition(images: ImageData[]): Promise<ImageData>;

async function generateImagePromo(promotion: string): Promise<ImageData> {
  const LE = await getPromotion(promotion);
  const photos = await Promise.all(
    LE.map(e => getPhoto( toUINT(e.id, 16) ) )
  );
  return getImageComposition( photos );
}
