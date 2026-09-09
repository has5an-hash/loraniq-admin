import AdminDemo from "./admin-demo";

const valid = ["commerce","analytics","projects","finance","crm","academy","calendar","inbox","settings","components"];

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminDemo slug={valid.includes(slug) ? slug : "commerce"} />;
}
