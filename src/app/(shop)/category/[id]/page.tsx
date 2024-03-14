import { notFound } from "next/navigation";

export interface PageProps{
  params: {
    id: string;
  }
}
export default function ({params}:PageProps) {
  const { id } = params;
  if (!['kids', 'men', 'womens'].includes(id)) {
    notFound();
  }
    return (
      <div>
        <h1>category Page {id}</h1>
      </div>
    );
}