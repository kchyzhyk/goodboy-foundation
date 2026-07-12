import { Loader, Center } from '@mantine/core';

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Center>
                <Loader size="xl" variant="dots" />
            </Center>
            <p className="mt-4 text-gray-500 animate-pulse">Načítavam...</p>
        </div>
    );
}
