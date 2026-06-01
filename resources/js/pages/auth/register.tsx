import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    useEffect(() => {
        router.visit('/login');
    }, []);

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen items-center justify-center">
                <p>Redirecting...</p>
            </div>
        </>
    );
}
