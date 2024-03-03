import 'astro/astro-jsx';

// TODO: Remove this when this issue is resolved:
//  https://github.com/ota-meshi/eslint-plugin-astro/issues/168
declare global {
    namespace JSX {
        type Element = HTMLElement;
        // type Element = astroHTML.JSX.Element // We want to use this, but it is defined as any.
        type IntrinsicElements = astroHTML.JSX.IntrinsicElements;
    }
}
