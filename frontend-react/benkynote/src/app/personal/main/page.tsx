'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StreakCalendar from '@/components/StreakCalendar';
import Dashboard from '@/components/Dashboard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';



 function Page() {
    const { user, error, isLoading } = useUser();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        if (user && !isLoading) {
            sync();
        }
    }, [user, isLoading, sync]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function sync() {
        setIsSyncing(true);

        try {
            console.log("sync");
            axios.post('http://localhost:8080/users/sync', {
                "user_id": user?.sub,
                "name": user?.name,
                "email": user?.email,
                "nickname": user?.nickname,
                "user_metadata": user?.["https://Benkynote/user_metadata"]
            })
        } catch (e) {
            console.log("error events: " + e);
        } finally {
            setIsSyncing(false);
        }
    }

    return (
        <div className='flex'>
            {/* Sidebar or Left Menu */}
            <div className='flex flex-col items-start bg-white m-5 rounded-lg p-6'>    
               {isSyncing && <p>Syncing...</p>}

               {/* Flex container for Calendar and Dashboard */}
               <div className='flex flex-row w-full gap-8 '>
                   {/* Calendar */}
                   <div className='w-1/2 pr-4 flex-grow'>
                       <StreakCalendar />
                   </div>

                   {/* Dashboard */}
                    <div className='w-1/2 pl-4 flex-grow'>
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default withPageAuthRequired(Page);