'use client';

import DeletePopup from '@/components/DeletePopup';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { useState } from 'react';

import TablePR from '@/components/TablePR';

export default function Page() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {/* <DeletePopup
        title="Eliminar Examen"
        desc1="Está seguro/a de que quiere eliminar el examen?"
        desc2="Si elimina el examen no podrá recuperarlo."
      />
      <div className="card flex justify-content-center">
        <Button
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
        <Dialog
          className="rounded-lg max-h-screen h-[86vh] bg-blue-50 dark:bg-slate-900 dark:text-white"
          header="Examen"
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          maximizable
          draggable={false}
          headerClassName="bg-blue-50 dark:text-white"
          // closable={false}
        > */}
      {/* <p className="m-0 p-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      </div> */}
      <div className="p-5 min-[1000px]:min-w-[84vw] min-[1900px]:min-w-[88vw]">
        <TablePR></TablePR>
      </div>
    </div>
  );
}
