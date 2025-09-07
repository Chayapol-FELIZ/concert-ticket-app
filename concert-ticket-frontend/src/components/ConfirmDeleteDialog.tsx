import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"; // ✅ MUI Icon

interface ConfirmDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    concertName: string | undefined;
}

const ConfirmDeleteDialog = ({
    isOpen,
    onClose,
    onConfirm,
    concertName,
}: ConfirmDeleteDialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center relative">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                        <CloseOutlinedIcon className="text-red-600" fontSize="medium" />
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">Are you sure to delete?</h3>
                <p className="text-gray-600 text-sm mb-4">“{concertName}”</p>

                <div className="flex justify-center gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-sm hover:bg-red-700"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteDialog;