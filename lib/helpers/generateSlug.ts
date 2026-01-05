export function generateSlug(name: string) {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, "-")          // replace spaces/underscores with hyphens
    .replace(/[^a-z0-9\-]/g, "")       // remove invalid characters
    .replace(/-+/g, "-");             // collapse multiple hyphens
   
  slug += "-";
  const params1 = "1a2b3c4d5e";
  const params2 = "6f7g8h9i0j";

  for (let i = 0; i < params1.length; i++) {
    let random = (Math.random() * 10).toFixed(0);
    slug += params1[parseInt(random)];
  }

  for (let i = 0; i < params2.length; i++) {
    let random = (Math.random() * 10).toFixed(0);
    slug += params2[parseInt(random)];
  }

  return slug;
}
