const shouldListContentRender = (data) => {
    return (
        (typeof data !== 'undefined') &&
        (data.length
            || (typeof data === 'object'
                && !Array.isArray(data))
        )
    );
}

export default shouldListContentRender;
