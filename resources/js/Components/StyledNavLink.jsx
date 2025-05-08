import NavLink from './NavLink';

export default function StyledNavLink({ href, active, children }) {
    return (
        <NavLink
            href={href}
            active={active}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
            {children}
        </NavLink>
    );
}
