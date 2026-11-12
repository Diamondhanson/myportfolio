export function SectionHead({
  num,
  title,
  id,
}: {
  num: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="sectionHead" id={id}>
      <span className="num">{num}</span>
      <h2>{title}</h2>
      <span className="fill" aria-hidden />
    </div>
  );
}
