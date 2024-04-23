// import Card from '@mui/joy/Card';
interface CardProps {
  link: any;
  title: string;
  place: string[];
  web: any;
  maker: string;
}
export default function MultipleInteractionCard({link,title,place,web,maker}:CardProps) {

  const handleAddCollection = () => {
       console.log(`heart`)
  };

  return (
    // <Card variant="outlined" sx={{ width: 320 }}>
    <div className="relative flex w-full max-w-[26rem] flex-col justify-between rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="bg-blue-gray-500 shadow-blue-gray-500/40 relative  mx-2 mt-2 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg">
        <img          
          src={web?.url}
          alt="ui/ux review check"
          />
        <div className="to-bg-black-10 from-transparent via-transparent to-black/60 absolute inset-0 h-full w-full bg-gradient-to-tr"></div>
        
        <button
          className="!absolute  right-4 top-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-red-500"
          type="button" 
          onClick={handleAddCollection}
          >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
            </svg>
          </span>
        </button>

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
            <a href={link?.web} target="_blank" rel="noreferrer">
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
    </div>
    // </Card>
  );
}
