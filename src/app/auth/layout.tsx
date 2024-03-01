const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-dvh min-h-svh flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to-slate-800 py-[120px]'>
			{children}
		</div>
	)
}

export default AuthLayout
