import { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
	return <input className="form-control mb-3" ref={ref} {...props} />;
});
