import { InstagramEmbed } from 'react-social-media-embed';

function RegisterFormCard() {
    return (
        <div className="w-full h-full rounded-[30px] xl:p-[30px] 2xl:p-[36px] bg-stone01">
            <div className="w-full h-full overflow-y-scroll hide-scrollbar">
                <InstagramEmbed url="https://www.instagram.com/p/C6-WrQCrQ1R/?hl=th"/>
            </div>
        </div>
    )
}

export default RegisterFormCard;