import { redirect } from 'next/navigation';
import getUrlByAlias from '@/lib/getUrlByAlias';

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}){
    const { alias } = await params;

    const originalUrl = await getUrlByAlias(alias);

    if (!originalUrl) {
        return redirect("/404");
    }

    return redirect(originalUrl);
}