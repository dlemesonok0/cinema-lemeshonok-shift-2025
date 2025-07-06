import Posters from "@/components/Posters";

export default function Home() {
    return (
        <div className="flex flex-col gap-4 px-60">
            <h1 className='text-3xl font-bold text-textTab dark:text-white'>Афиша</h1>
            <Posters/>
        </div>
    );
}
