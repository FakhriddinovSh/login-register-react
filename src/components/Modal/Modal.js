import { useRef } from 'react';

export const Modal = ({ children, setModal, title }) => {
	const styledOverlay = {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		heigth: '100vh',
		zIndex: 100,
		background: 'rgba(0,0,0,0.4)',
	};

	const elOverlay = useRef();

	const handleOverlayClick = (evt) => {
		if (evt.target === elOverlay.current) {
			setModal(false);
		}
	};

	return (
		<div
			ref={elOverlay}
			onClick={handleOverlayClick}
			style={styledOverlay}
			className="overlay d-flex align-items-center justify-content-center"
		>
			<div className="my-modal p-5 w-50 bg-white position-relative">
				<div className="modal-header">
					<p className="fs-4">{title}</p>
					<button
						onClick={() => setModal(false)}
						className="btn btn-dark top-0 end-0 position-absolute"
					>
						&times;
					</button>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
};
