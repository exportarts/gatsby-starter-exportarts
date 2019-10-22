import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

function isExternalLink(link) {
    return /https?:\/\//gi.test(link);
}

function isInternalAnchorLink(link) {
    return /#.+$/.test(link);
}

function isMailtoOrTelLink(link) {
    return /(tel:|mailto:)/gi.test(link);
}

function getFragmentFromLink(link) {
    const indexOfHash = link.indexOf('#');
    return link.substr(indexOfHash + 1);
}

const onAnchorScroll = (event, targetID, callback) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetID);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        console.warn(`Tried to scroll to element with ID "${targetID}", but it could not be found.`);
    }

    if (callback) {
        return callback(event);
    }
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, callback, ...other }) => {
    const isAnchorLink = isInternalAnchorLink(to);
    const shouldUseATag = isAnchorLink || isExternalLink(to) || isMailtoOrTelLink(to);
    if (shouldUseATag) {
        return (
            <a
                data-anchor-tag // To make "real" <a> visible for debugging
                onClick={isAnchorLink ? event => onAnchorScroll(event, getFragmentFromLink(to), callback) : undefined}
                href={to}
                {...other}>
                {children}
            </a>
        );
    }

    // Otherwise it's a normal internal link
    return (
        <GatsbyLink
            to={to}
            activeClassName={activeClassName}
            partiallyActive={partiallyActive}
            {...other}
        >
            {children}
        </GatsbyLink>
    );
}

export default Link
