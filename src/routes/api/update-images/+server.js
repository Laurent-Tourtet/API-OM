import { updatePlayerImages } from '$lib/api/updatePlayerImages.js';

export async function POST() {
    return await updatePlayerImages();
}
