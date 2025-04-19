import { redirect } from 'next/navigation';
import getUrlByAlias from '@/lib/getUrlByAlias';

export const dynamic = "force-dynamic";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: { alias: string };
}) {
    const { alias } = params;
    const originalUrl = await getUrlByAlias(alias);

    if (!originalUrl) {
        return redirect("/404");
    }

    return redirect(originalUrl);
}