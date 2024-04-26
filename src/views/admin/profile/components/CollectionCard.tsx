// import Button from 
interface CollectionProps {
  link: any;
  title: string;
  place: string[];
  web: any;
  maker: string;
  deleteCard: any
}
export default function CollectionCard({
  link,
  title,
  place,
  web,
  maker,
  deleteCard
}: CollectionProps) {
  
  return (
    <div>
      <div className="relative flex max-h-[39rem] w-full max-w-[26rem] flex-col justify-between rounded-2xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="bg-blue-gray-500 shadow-blue-gray-500/40 relative  mx-2 mt-2 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg">
          <img src={web} alt="ui/ux review check" />
          <div className="to-bg-black-10 from-transparent via-transparent to-black/60 absolute inset-0 h-full w-full bg-gradient-to-tr"></div>

          
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-blue-gray-900 block font-sans text-xl font-medium leading-snug tracking-normal antialiased">
              {title}. {place}
            </h5>
          </div>
          <div className="group mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="block font-sans text-lg font-medium leading-relaxed text-gray-700 antialiased">
              {maker}
            </p>

            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <a href={link} target="_blank" rel="noreferrer">
                <svg
                  xmlns="https://www.wp.pl"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={deleteCard}>
          Delete Card
        </button>

      </div>
    </div>
  );
}
