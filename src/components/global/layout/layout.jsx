import React from 'react';
import Helmet from 'react-helmet';

// Helmet does not support React.Fragment, therefore the below syntax
// see: https://github.com/nfl/react-helmet/issues/342
const Meta = ({ title, description, image }) => (
    <Helmet>
        {title && <title>{title}</title>}
        {title && <meta name="og:title" content={title}></meta>}
        {description && <meta name="description" content={description}></meta>}
        {description && <meta name="og:description" content={description}></meta>}
        {image && <meta name="image" content={image}></meta>}
        {image && <meta name="og:image" content={image}></meta>}
    </Helmet>
);

export default props => {
    return (
        <React.Fragment>
            <Meta
                title={`${((props.title !== null && props.title !== undefined) ? props.title : '') + ((props.titleDivider !== null && props.titleDivider !== undefined) ? props.titleDivider : '')}${props.titleSuffix ? props.titleSuffix : ''}`}
                description={props.description}
                image={props.image}
            />
            {props.children}
        </React.Fragment>
    );
}
