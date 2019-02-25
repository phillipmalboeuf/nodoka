import * as React from 'react'

interface Props {
  src: string,
  alt?: string,
  small?: boolean,
  onLoad?: (e: React.SyntheticEvent<HTMLElement>) => void
}

const replace = (src: string, size: number): string => {
  return `${src.replace('https://cdn.shopify.com', 'https://easylover.imgix.net')}&auto=format,compress&w=${size}`
}

export const Picture: React.SFC<Props> = props => {
	return <picture onLoad={props.onLoad}>
    {props.small
    ? <>
      <source srcSet={replace(props.src, 300)} media="(max-width: 600px)" />
      <source srcSet={replace(props.src, 450)} media="(max-width: 900px)" />
      <source srcSet={replace(props.src, 600)} media="(max-width: 1200px)" />
      <img src={replace(props.src, 750)} alt={props.alt} />
    </>
    : <>
      <source srcSet={replace(props.src, 600)} media="(max-width: 600px)" />
      <source srcSet={replace(props.src, 900)} media="(max-width: 900px)" />
      <source srcSet={replace(props.src, 1200)} media="(max-width: 1200px)" />
      <img src={replace(props.src, 1500)} alt={props.alt} />
    </>}
	</picture>
}

