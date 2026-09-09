import AdminDemo from "./admin-demo";
import "./dashboard-responsive.css";

const valid = ["commerce","analytics","projects","finance","crm","academy","calendar","inbox","settings","components"];

export const dynamicParams = false;

export function generateStaticParams() {
  return valid.map((slug) => ({ slug }));
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminDemo slug={valid.includes(slug) ? slug : "commerce"} />;
}
