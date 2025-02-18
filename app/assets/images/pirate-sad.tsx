import * as React from "react"
import Svg, { Path, Ellipse, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={375}
      height={257}
      viewBox="0 0 375 257"
      fill="none"
      {...props}
    >
      <Path
        d="M402 255.237c-23.36-17.99-53.132-34.856-89.316-47.224C150.083 153.294-16.182 239.495-40 252.238c71.453 7.871 152.982 13.118 242.756 12.743 72.369-.375 139.242-4.122 199.244-9.744z"
        fill="#EBBE83"
      />
      <Ellipse
        cx={112}
        cy={228.5}
        rx={65}
        ry={9.5}
        fill="#CEA570"
        fillOpacity={0.4}
      />
      <Path
        d="M51.67 171.2c-1.3 2.9-2.5 3.7-3.4 3.8-2.4.3-3.2-3.4-8.7-6.7-1.7-1.1-2.6-1.3-3.6-2.5-1-1.4-2.1-3.9-1.3-6.2.7-1.9 2.3-2.4 2.1-3.7-.2-1.2-1.5-1.5-1.4-2.2.1-1.3 3.1-2.1 4.4-2.1 6 0 10.7 15.5 11.9 19.6zM151.471 168.3c.9.2 2.6.3 4.4-.5 3.2-1.6 4.7-6 3.7-8.9-.7-2.3-2.4-2.3-4.2-6.1-.6-1.4-.6-1.9-1.3-3-.5-.8-2.1-3.1-4.5-3.5-1.8-.2-3.6.5-4.4 1.3-4 3.8 5.5 19.3 6.3 20.7z"
        fill="#66ABCC"
      />
      <Path
        d="M12.07 199.801c-.7.5-13.7 10.8-11.9 27.4 1.7 15.7 15 23 16.1 23.6 10.8-4 17.9-14.4 17.7-25.5-.3-12.3-9.4-23-21.9-25.5z"
        fill="#FFC482"
      />
      <Path
        d="M178.971 195.301c-7.067.933-14.4 1.7-22 2.3-20.6 1.4-39.5.9-56.3-.6-9.4.933-19.134 1.666-29.2 2.2-21 1.2-40.8 1.2-59.4.6 10.4 3.6 17.7 12.9 18.7 23.8 1 11.1-4.7 21.8-14.5 27.2 16.666-1.4 33.566-2.634 50.7-3.7 39-2.4 77-3.9 113.9-4.7 2.6-2.7 6.4-7.5 8.1-14.5 4.2-17.2-8.8-31.3-10-32.6z"
        fill="#5E3629"
      />
      <Path
        d="M182.671 209.8s-.6.1-1.8.1c-1.2.1-3 .1-5.2.2s-5 .2-8.1.2c-3.1 0-6.6.1-10.4.1-3.8.1-8 .1-12.3.2-4.4 0-9-.1-13.8 0-4.8.1-9.7.4-14.6 1.4-1.2.3-2.4.6-3.6 1.1-1.1.4-2.3 1-2.7 1.8-.067.2-.1.4-.1.6.067.134.167.3.3.5.4.4 1 1.3 1 2.2 0 .8-.5 1.6-.9 2.2-.4.6-1 1.1-1.5 1.5-4.5 3.3-9.8 4.5-14.9 4.9-5.3.4-10.5-.3-15.3-2.3-1.1-.5-2.3-1.1-3.3-1.7-.6-.4-1.2-.8-1.7-1.3-.5-.4-1-1-1.4-1.4-1.2-1.6-2.8-2.4-4.8-3.3-3.6-1.6-7.7-1.8-11.4-1.8-3.8-.1-7.4-.1-10.5-.3-3.2-.3-5.9-.5-8.1-.9-4.5-.7-7-1.2-7-1.2l.1-.3s2.5 0 7 .2c2.2.1 4.9.1 8 0 3.1-.1 6.6-.3 10.4-.5 3.8-.1 8.3-.3 12.9 1.6.6.2 1.1.4 1.6.7l.4.2.4.2c.267.134.533.3.8.5 1.1.6 2.3 1.7 3 2.6.4.5.6.8 1 1.1.3.3.7.6 1.2.9.9.6 1.8 1.1 2.8 1.6 4.1 1.9 8.9 2.6 13.7 2.5 2.4 0 4.9-.3 7.3-.9 2.3-.5 4.7-1.3 6.7-2.6.5-.3 1-.6 1.3-1 .3-.5.6-.8.6-1.3.1-.4-.1-.7-.5-1.3-.2-.2-.4-.6-.5-1.2 0-.4.1-.9.3-1.2.4-.8 1-1.2 1.6-1.5.6-.333 1.233-.633 1.9-.9 1.2-.4 2.4-.7 3.7-1 5-1 9.9-1.6 14.7-2.2 4.8-.5 9.4-1 13.8-1.2 4.4-.1 8.6-.1 12.4 0 3.9.1 7.4.2 10.5.4 3.1.3 5.8.5 8 .7 2.3.3 4 .4 5.2.6 1.2.1 1.9.2 1.9.2l-.1.3zM181.571 230.299c0-1-12.2-.9-17.8-.9-19.7.2-46.6 2-46.5 3.7 0 1.4 20.7 2.9 41.5 1.1 10.5-1 22.9-2.9 22.8-3.9zM34.17 238.201s1.2-.5 3.3-1.1c2.1-.7 5.1-1.5 8.7-2.2 1.8-.4 3.8-.8 5.8-1.1 2.1-.3 4.3-.5 6.6-.8 2.334-.2 4.7-.567 7.1-1.1 2.3-.5 4.7-1.3 7.2-1.7 1.267-.2 2.534-.334 3.8-.4h1.9c.7.1 1.3.1 1.9.2 2.6.2 5 .9 7.2 1.4 2.2.5 4.3.9 6.3 1.3 2 .266 3.934.466 5.8.6 3.601.3 6.601.4 8.801.4h3.4v.4s-1.2.4-3.3.9c-2.1.6-5.2 1.1-9 1.3-1.9 0-4 0-6.1-.2-2.2-.2-4.6-.7-6.8-1.4-2.3-.7-4.4-1.4-6.7-1.8-.6-.1-1.1-.2-1.7-.3l-1.8-.3a56.008 56.008 0 00-3.5-.3c-2.4 0-4.9.4-7.2.9-2.4.5-4.7 1.2-6.9 1.9s-4.4 1.4-6.4 1.9c-2.2.4-4.1.7-6 1-3.6.4-6.7.7-8.9.8-2.1.1-3.4 0-3.4 0l-.1-.3z"
        fill="#4D2C21"
      />
      <Path
        d="M55.47 61.7c-2.5.6-7 1.9-11.5 5.3-5.1 3.9-7.6 8.4-8.8 10.8-.3 3.6-1.2 8.1-3 13.1-2.2 6.3-5.1 10.999-7.5 14.299.734.667 1.5 1.367 2.3 2.1 2.4-.5 6.1-1.5 10.1-3.5 11.7-5.8 17-15.8 18.4-18.6 1.4-2.8 3.2-7.4 3.9-13.4a453.534 453.534 0 01-3.9-10.1z"
        fill="#374863"
      />
      <Path
        d="M51.97 73.4l-.1-.1c-.2 0-1.7-.6-2.1-2.3-.3-1.2.2-2.6 1.3-3.4.2-.1.4-.1.6.1.1.2.1.4-.1.6-.8.6-1.2 1.6-1 2.5.3 1.3 1.5 1.7 1.6 1.8.2 0 .3.3.2.5 0 .2-.2.3-.4.3z"
        fill="#4C2C4F"
      />
      <Path
        d="M63.07 74.4c-2.7.8-6.4 2.3-9.2 5.7-3.7 4.4-3.9 9.3-4.6 21-.3 4.5-.8 11.8-1.6 20.9 1.067-.133 2.134-.3 3.2-.5 3.5-2.7 9.1-7.9 13.3-16.1 5.7-10.9 5.8-21 5.6-25.7-2.266-1.8-4.5-3.566-6.7-5.3z"
        fill="#374863"
      />
      <Path
        d="M56.37 73.4c0 1.5-1.1 2.6-2.6 2.6-1.4 0-2.6-1.1-2.6-2.6 0-1.4 1.2-2.6 2.6-2.6 1.5 0 2.6 1.2 2.6 2.6z"
        fill="#F74C2A"
      />
      <Path
        d="M155.071 249c-.2-1.3-1.9-1.7-4.5-3.2-2.2-1.3-3.8-2.8-5.1-4.2-3.2-.2-6.433-.367-9.7-.5-.2.8-.4 2-.5 3.3-.4 3.3 0 3.9.3 4.2.4.4 1 .6 2.1.8 1.3.3 2.4.3 3.1.3.867.266 1.733.566 2.6.9 1.8 1.2 3.5 1.7 4.6 2 1.8.4 3.4.8 4.8 0 1.3-.7 2.6-2.2 2.3-3.6z"
        fill="#232B44"
      />
      <Path
        d="M137.671 242.5c-2.7-2.2-5.6-5-8.4-8.4-7.6-9.3-10.6-19.1-11.9-25.3-3.5.1-7.5-.1-11.9-.6-8-1-14.8-3-20-5-.9 9.5-1.4 19.9-1.3 30.9.066 4.134.2 8.167.4 12.1-4.2-1.4-11.3-4.6-17.7-11.3-11.8-12.3-12.5-27.5-12.6-31.5-1.4-1.4-3-3.4-2.5-5.2 1-3.9 10.9-4.7 42.2-3.6 40.1 1.5 43.9 3.6 46.6 6.9 10.2 12.6-.8 36.5-2.9 41z"
        fill="#6B0047"
        opacity={0.3}
      />
      <Path
        d="M159.771 207.9a784.53 784.53 0 00-8.1 20.6c-1.867 4.933-3.667 9.8-5.4 14.6-.2 0-1.4-.3-2.6.4-.9.5-1.3 1.4-1.4 1.7-.5.1-1.9.5-3.5.1-1.4-.4-2.3-1.2-2.7-1.6-1.5-3.6-2.9-7.7-3.9-12.4-2.2-9.6-2.2-18-1.7-24.3 6.4-6.2 14.9-8.4 21.7-5.5 3.9 1.6 6.3 4.5 7.6 6.4zM91.17 213.499c.6 1.5 1 3 1.5 7.3.5 5.5.9 13.4.1 23.3l1.2 4.2c-.2.4-1.1 2.4-3.4 3.2-2.1.8-4.4.3-6.1-1.2-.4-1.466-.8-2.9-1.2-4.3-3.6-2.2-9.2-6.2-14-12.9-6.1-8.1-8.1-16.2-8.9-20.6.3-1 3.3-9.4 10.7-11.4 8.7-2.4 17.2 5.6 20.1 12.4z"
        fill="#E09582"
      />
      <Path
        d="M159.771 219.3c.7-.1 1-3.2 1.1-7 1.8-2.4 4.3-6.1 5.8-11.1.3-1.1 5.2-17.6-2.8-25.9-2.3-2.4-6.4-5-28.7-3.4-8.9.7-21.2 2-35.6 5-13.7-7-25.3-8-31.8-8-11.4 0-15.7 3.1-17.2 4.4-1.2 1-7.4 6.4-6.7 14.5.6 6.7 5.6 12.5 12.8 14.8-.6 1.6-1.8 5.7-.3 10.3.5 1.6 1.3 2.9 2 3.9 3.4-.133 6.833-.233 10.3-.3.133-3.266.5-4.933 1.1-5 .733-.133 1.833 2.1 3.3 6.7 2.067-.133 4.133-.233 6.2-.3-.6-10.133-.534-15.233.2-15.3.733-.133 2.033 4.034 3.9 12.5 1.8.1 3.7.1 5.9 0 2.9-.2 5.6-.6 7.8-1.1-.7-1.5-1.4-3.5-1.7-6.1-.4-3.8.3-6.9.8-8.7 2.8 1 5.9 1.9 9.2 2.5 9 1.9 17 1.8 23.2 1.2-1.3 1.5-3.4 4.5-3.9 8.9-.2 1.6-.2 3 0 4.1 1.667-.333 3.333-.7 5-1.1 1.2 1 3 2.4 5.5 3.4 2.2.9 4.2 1.2 5.6 1.4 2.8-7.9 3.9-10.1 4.2-10.1.5.2-1.9 6.7.6 8.7.9.7 2.3.6 3.6.3 1.5 1.3 3.7 2.9 5 2.2 2.8-1.5-.2-12.4.5-12.6.8-.1 3.5 11.4 5.1 11.2z"
        fill="#99513F"
      />
      <Path
        d="M155.871 157.3c-.133.2-.3.4-.5.6-9 4.2-17 7.8-23.8 10.7-21.7 9.4-30.1 11.9-40.1 10.2-2.7-.4-1-.4-8.5-2.5-19.5-5.2-29.8-7.9-35-9.2-3.8-1-5-1.2-5-1.2-2.2-.5-6.4-1.4-7.3-4.2-.7-2.1.8-4.5 1.9-5.8.2-2.8.7-6.3 1.6-10.1.7-2.7 1.6-5.5 2.9-8.5.333-.867.7-1.733 1.1-2.6 1.4-2.7 2.8-5.1 4.2-7.2.6-.867 1.166-1.667 1.7-2.4 1-2.6 2.8-6.6 6.2-10.5a.657.657 0 01.3-.3c2.7-3.1 5.6-5.2 8.1-6.7h.1c1.7-1 3.2-1.7 4.3-2.1 7.7-2.5 19.3-5 32.8-3.3 4 .4 13.4 1.7 21.8 6.9.8.4 1.533.867 2.2 1.4 2.3 1.6 4 3.3 5.3 4.6 1.1 1.2 1.8 2.1 2.1 2.5 2.1 3 3.5 6 4.2 8.3.2.6.4 1.167.6 1.7 2.3 2.8 4.1 5.2 5.7 7.3 3.1 4.2 4.8 7 5.7 9 .067.067.1.133.1.2 1.1 2.3 2.2 5.2 5.2 6.7 1.3.7 2.6 1 3.1 2.1.6 1.3-.1 3-1 4.4z"
        fill="#B5D5FF"
      />
      <Path
        d="M142.771 134.9c-2.7-.1-6.2.1-9.9 1.5-8.2 3-12.3 9.4-13.4 11.3-2.8-.9-5.9-1.7-9.2-2.3-15.1-2.8-28.4-.8-37.8 1.7-2.9-2.4-7.6-5.5-13.8-7.6-6.4-2.1-12.2-2.4-16.6-2.2.333-.866.7-1.733 1.1-2.6 1.4-2.7 2.8-5.1 4.2-7.2 2.4-.1 5.1 0 8 .6 10.9 2 17.9 8.4 20.6 11.2 4.1-.8 8.7-1.5 13.6-1.8 11.2-.8 20.8.4 28.2 2 .9-2 2.9-5.7 6.7-8.7 4.2-3.4 8.8-4.5 12-4.9.2.6.4 1.167.6 1.7 2.3 2.8 4.1 5.2 5.7 7.3zM70.97 152.699c-3.7 3.6-9.8 8.5-18.4 12.3-1.4.7-3 1.4-4.6 2.1-3.8-1-5-1.2-5-1.2-2.2-.5-6.4-1.4-7.3-4.2-.7-2.1.8-4.5 1.9-5.8.2-2.8.7-6.3 1.6-10.1 5.6-1.1 11.9.1 16.6 1.1 6.7 1.3 11.9 3.8 15.2 5.8z"
        fill="#66ABCC"
      />
      <Path
        d="M130.171 115.1c-.6.133-1.167.266-1.7.4-9 2.7-12.5 11.3-13 12.6-2.7-.8-5.7-1.4-8.9-1.9-12.3-1.8-23-.3-30.8 1.6-1.4-2.2-4.7-6.9-11-10.2-3.5-1.8-6.8-2.7-9.5-3a.647.647 0 01.3-.3c2.7-3.1 5.6-5.2 8.1-6.7h.1c.8.2 1.6.466 2.4.8 7.9 3 12 9 13.4 11.3 2.8-.6 5.8-1.1 9-1.5 9.9-1 18.7-.1 25.5 1.3.5-1.6 1.5-3.8 3.3-6.1 1.7-2 3.6-3.4 5.3-4.3.8.4 1.533.866 2.2 1.4 2.3 1.6 4 3.3 5.3 4.6z"
        fill="#66ABCC"
      />
      <Path
        d="M109.871 103.4c1.2 2.8 2.3 6 2.9 9.6 3.3 18-5.5 33-9.2 38.7-3.8-5.8-7.7-12.2-11.5-19-5.9-10.8-10.6-21.1-14.4-30.5 2.8-1 6.2-1.8 10-2.1 9.7-.9 17.6 1.5 22.2 3.3zM155.871 157.3c-3.7-1.3-9-2.4-15.3-1-10.1 2.1-15.5 9.1-16.7 10.8-10.6-1-22.3-1.5-34.9-1.2-7.7.1-15 .6-21.9 1.2-.667-2.467-1.3-4.967-1.9-7.5 11.4-1.6 24.8-2.5 39.7-1.7 5.8.4 11.3 1 16.5 1.7 1.1-1.9 8.2-13.3 21.5-15.2 2-.3 4-.4 5.7-.3 1.1 2.3 2.2 5.2 5.2 6.7 1.3.7 2.6 1 3.1 2.1.6 1.3-.1 3-1 4.4z"
        fill="#66ABCC"
      />
      <Path
        d="M56.87 52.8c-.5-.7-2.4-3.1-5.8-3.8-3.3-.6-7 .5-9.1 3.2-3.1 3.7-2.2 9.1.2 12.4 3.1 4.1 9.1 5.5 14.6 3.1 0-5 .034-9.968.1-14.9zM126.371 52.8c.5-.7 2.5-3.1 5.9-3.8 3.3-.6 6.9.5 9.1 3.2 3 3.7 2.1 9.1-.3 12.4-3.1 4.1-9.1 5.5-14.5 3.1l-.2-14.9z"
        fill="#E09582"
      />
      <Path
        d="M108.471 97.4l-.6 8.799c1.1 2.5 2 5.3 2.6 8.3 3 15.6-3.3 28.7-6.6 34.6-7.533-14.8-15.1-29.566-22.7-44.3l2.6-10.6c8.266 1.067 16.5 2.134 24.7 3.2z"
        fill="#D98773"
      />
      <Path
        d="M122.376 14.332c5.6 5.2 8.4 12.2 8.5 12.5 3.8 9.8 1.8 18.6.9 21.9 1.6 3.4 4 9.4 3.7 17.1-.8 17.6-15.4 27.6-16.8 28.5-16.9 11.2-41 6.1-53.8-7.2-7.7-8-9.7-17.2-10.9-23-1.4-6.2-7.4-34.5 12-50.8 17.2-14.4 43.9-10.6 56.4 1z"
        fill="#E09582"
      />
      <Path
        d="M60.57 40.2c-.4 3.1-.6 7.4.1 12.4.7 4.9 2 8.9 3.2 11.8-2.732-.334-5.5-.7-8.3-1.1-.2-1.667-.366-3.334-.5-5-.532-4.867-1.066-9.7-1.6-14.5 2.334-1.2 4.7-2.4 7.1-3.6z"
        fill="#875126"
      />
      <Path
        d="M93.37 51.7c0 4.7-3.8 8.5-8.5 8.5s-8.5-3.8-8.5-8.5c0-4.8 3.8-8.6 8.5-8.6s8.5 3.8 8.5 8.6z"
        fill="#fff"
      />
      <Path
        d="M101.671 63.4s.4 0 1-.1 1.5-.2 2.4-.5c.5-.2 1-.4 1.5-.7.5-.3 1-.6 1.7-1 .3-.1.9-.3 1.5-.1h.2v.1h.1c.1 0 .3.2.4.3.2.133.367.3.5.5.5.8.6 1.6.7 2.5 0 .8-.2 1.6-.6 2.4-.5.7-1.1 1.3-1.7 1.7-.6.4-1.3.6-1.9.8-.3.1-.6.2-1 .2-.2.1-.6.1-.9.1-1.1 0-2-.3-2.6-.6-.6-.2-.9-.4-.9-.4s.4.1 1 .1c.6.1 1.5.1 2.5-.1.2 0 .433-.067.7-.2.2 0 .5-.1.8-.2.466-.267.933-.567 1.4-.9.5-.4.9-.8 1.1-1.3.1-.1.1-.2.2-.3l.1-.3v-.2c.067-.267.1-.534.1-.8 0-.6-.1-1.2-.4-1.6l-.1-.2c-.1-.1 0-.1-.1-.1l-.1-.1c-.1 0-.2 0-.4.1-.6.2-1.2.5-1.8.7-.6.3-1.2.4-1.8.5-1.1.2-2 .1-2.6 0-.6-.1-1-.3-1-.3zM96.74 74.525c8.299-.073 14.93 3.37 18.35 5.64l-.888 1.407c-3.621-2.368-11.156-6.302-20.447-5.22-2.997.326-5.989 1.252-8.877 2.577l-.713-1.494a31.56 31.56 0 019.375-2.782 51.26 51.26 0 013.2-.128z"
        fill="#A1371A"
      />
      <Path
        d="M86.778 79.237l-1.483.963-2.505-3.94 1.483-.963 2.505 3.94z"
        fill="#A1371A"
      />
      <Path
        d="M88.07 52.5c0 3.1-2.5 5.7-5.7 5.7-3.1 0-5.7-2.6-5.7-5.7 0-3.2 2.6-5.7 5.7-5.7 3.2 0 5.7 2.5 5.7 5.7z"
        fill="#2784A1"
      />
      <Path
        d="M93.87 51.8s-.1-.4-.3-1.1c-.2-.6-.6-1.5-1.2-2.5a11.212 11.212 0 00-1.2-1.4c-.466-.467-.966-.9-1.5-1.3-1.2-.7-2.6-1.3-4.1-1.4a5.56 5.56 0 00-2.1 0c-.2 0-.3 0-.5.1-.2 0-.4 0-.6.1a5.704 5.704 0 00-1 .3c-1.2.5-2.3 1.3-3.1 2.1-.8.9-1.4 1.7-1.7 2.3-.4.6-.5 1-.5 1v-.3c0-.2.1-.5.2-.8.2-.7.5-1.7 1.2-2.8.8-1 1.9-2.1 3.3-2.8.4-.2.8-.367 1.2-.5.2-.1.4-.1.6-.2.1 0 .4-.1.6-.1.9-.2 1.8-.2 2.6-.1 1.8.2 3.4 1 4.7 1.9.7.5 1.2 1.1 1.7 1.7.4.6.7 1.2 1 1.7.5 1.2.7 2.3.7 3 .1.7 0 1.1 0 1.1z"
        fill="#231F20"
      />
      <Path
        d="M83.77 67.1c0 4.5-3.6 8.1-8.1 8.1s-8.1-3.6-8.1-8.1c0-4.4 3.6-8 8.1-8s8.1 3.6 8.1 8zM131.971 67.1c0 4.5-3.6 8.1-8.1 8.1-4.4 0-8.1-3.6-8.1-8.1 0-4.4 3.7-8 8.1-8 4.5 0 8.1 3.6 8.1 8z"
        fill="#E07E6E"
      />
      <Path
        d="M90.87 35.8c-.1.6-.9.9-4.8 1.9-5.8 1.5-6.2 1.3-6.3 1.1-.4-.8 1.5-2.7 3.1-3.8 1-.6 3.3-2.2 5.7-1.4 1.1.4 2.4 1.3 2.3 2.2z"
        fill="#582B00"
      />
      <Path
        d="M64.77 152.299c4.5-7.9 8.8-13.3 10.6-12.5 1.8.7 1 7.7-1.4 16.8a565.975 565.975 0 01-9.2-4.3zM128.671 158.401c-1.8-2.9-3.7-6.2-5.4-9.9-2.3-4.5-3.9-8.8-5.3-12.7-.8 8.666-1.633 17.366-2.5 26.1 1.867 3.466 3.7 6.966 5.5 10.5 2.533-4.667 5.1-9.334 7.7-14z"
        fill="#6B0047"
        opacity={0.3}
      />
      <Path
        d="M133.871 39.3c-6.4-3-15.6-6.3-26.9-7.2-27.8-2.2-48.4 11.9-54.9 16.8-.8-3.8-2.9-16.3 4.2-28.7C67.47.5 91.27 0 93.47 0c4.8 0 24 .7 34.4 16.3 6.2 9.3 6.2 19 6 23z"
        fill="#374863"
      />
      <Path
        d="M53.97 56.5c-1.5-2.6-4.4-3.8-7.2-3.2-2.7.5-4.8 2.8-5.2 5.4-.5 4.1 3.6 6.7 4.1 7 4.1 2.4 8.6.1 8.9 0-.5-.6-1.4-2-1.7-4.1-.3-2.6.8-4.5 1.1-5.1z"
        fill="#D17E69"
      />
      <Path
        d="M51.97 49.5c-.3 0-.6-.1-.7-.3-.3-.4-.2-.9.2-1.2 10.9-7.7 33.4-20.1 61.101-16.5 7.9 1.1 15.6 3.4 23 6.8.4.2.6.7.4 1.1-.2.4-.7.6-1.1.4-7.2-3.4-14.8-5.6-22.5-6.6-27.1-3.6-49.2 8.6-60 16.2a.889.889 0 01-.4.1z"
        fill="#6A94CC"
      />
      <Path
        d="M133.271 45.9l.8 2.6c-.467.2-.967.4-1.5.6 1.2 5.6-.7 11.2-4.7 14.1-4.1 2.8-9.3 2.3-12.4.8-7-3.4-10.5-14.6-7-27.4-2.8-3.9-7.1-8.9-13.5-13.2-14.2-9.5-28.9-9.5-34.7-9.1.2-.6.5-1.4 1.3-2.3 1.1-1.3 2.6-1.8 3.2-1.9 6.6 1.6 13.8 3.8 21.3 6.8 20.8 8.2 36.4 19.5 47.2 29z"
        fill="#3C2A45"
      />
      <Path
        d="M63.17 66.2c.1-.4-2.6-1.1-3.1-1.2-1.6-.4-4.3-.9-4.4-.5-.1.4 1.6 1.5 3.5 1.9 1.9.4 3.9.2 4-.2zM62.67 68.4c-.1-.3-1.1-.3-2.6-.4-1.4-.1-2.2-.1-2.2.1-.1.3 1 1.1 2.3 1.1 1.3.1 2.5-.5 2.5-.8z"
        fill="#875126"
      />
      <Path
        d="M82.67 182.5c-2.3-.4-5.5-.8-9.4-.2-6.5.9-11.2 3.9-13.5 5.6 1.067 4.067 2.167 8.1 3.3 12.1 2.6-1.2 6.3-2.7 10.9-3.5 4.5-.9 8.4-.9 11.2-.6-.8-4.467-1.633-8.933-2.5-13.4z"
        fill="#932C00"
      />
      <Path
        d="M80.17 197.601l-1-3.4 1.6-.4 1 3.4-1.6.4zM61.07 197.3l-.5-1.6 2.2-.7.6 1.6-2.3.7zM59.27 192.2l-.3-1.7 2.3-.4.3 1.7-2.3.4zM75.57 183.2l-.3-2 1.7-.3.3 2.1-1.7.2zM64.77 187.3l-2.3-2.6 1.2-1.1 2.3 2.6-1.2 1.1z"
        fill="#4A1600"
      />
      <Path
        d="M130.171 200.9c1.4.4 3.3-3.6 5.8-6.7 5-6.3 11-7.8 10.7-8.4-.3-.6-7 .6-11.9 5.5-2.8 2.7-4.1 5.6-4.6 5.4-1-.4 1.9-9 1.4-9.2-.4-.2-3.2 7.6-4.4 7.3-.9-.2-.3-5-.6-5-.5 0-2.2 11-1 11.3.6.1 1.5-2.7 2.7-2.5 1 .1.9 2 1.9 2.3zM95.47 199.399c-.5-.2.4-2.1.4-5.2 0-6.6-3.8-10.6-3.1-11.1.7-.6 6.7 3.2 6.9 8.6.1 4.3-3.5 8-4.2 7.7z"
        fill="#6B0047"
        opacity={0.3}
      />
      <Path
        d="M112.071 35.9l-.7-.4c.333-.534.633-1.034.9-1.5l.1-.3.4.2c.467.2.967.4 1.5.6l-.3.8c-.4-.2-.8-.367-1.2-.5-.2.333-.433.7-.7 1.1zM120.271 64.4c-1.133-.133-2.233-.5-3.3-1.1l.3-.7c1.067.533 2.1.867 3.1 1l-.1.8zm3.6-.3l-.3-.8a7.112 7.112 0 002.9-1.5l.5.6a8.34 8.34 0 01-3.1 1.7zm-9.8-2.8c-.2-.2-.367-.333-.5-.4a11.851 11.851 0 01-1.9-2.2l.7-.5a12.82 12.82 0 001.8 2c.067.133.2.3.4.5l-.5.6zm15.3-1.5l-.7-.5c.4-.6.7-1.2.9-1.6.267-.4.5-.833.7-1.3l.8.3c-.2.467-.433.933-.7 1.4-.2.4-.6 1-1 1.7zm-19.4-4.2c-.4-1-.733-2.1-1-3.3l.8-.2c.267 1.133.6 2.2 1 3.2l-.8.3zm21.9-2.3l-.8-.1c.067-.667.1-1.333.1-2v-1.3l.8-.1c.067.4.1.867.1 1.4 0 .733-.067 1.433-.2 2.1zm-23.3-4.5a9.838 9.838 0 01-.1-1.4c0-.667.033-1.333.1-2h.8v3.4h-.8zm22-2a40.74 40.74 0 00-2.4-2.4l.6-.6c.8.733 1.6 1.533 2.4 2.4l-.6.6zm-4.9-4.6a55.447 55.447 0 00-2.7-2l.4-.7 2.8 2-.5.7zm-15.7-.1l-.9-.1c.267-1.133.6-2.267 1-3.4l.8.3c-.4 1.067-.7 2.133-.9 3.2zm10.2-3.7c-1-.6-2-1.167-3-1.7l.4-.7 3 1.6-.4.8z"
        fill="#FFBEA1"
      />
      <Path
        d="M96.77 24.7c2.1 1.5 5.601 4.6 7.801 9.7.8 2 1.3 3.8 1.5 5.3-.5 1.6-2.1 6.2-.5 11.7 1.3 4.4 3.9 7.2 5.1 8.3-.7-2.9-1.3-6.7-1.4-11.1-.1-4.7.5-8.8 1.1-12-.8-1.6-2-3.3-3.6-5.1-3.6-3.8-7.5-5.8-10-6.8z"
        fill="#6B0047"
        opacity={0.3}
      />
      <Path
        d="M54.17 72.9c-.133 0-.266-.067-.4-.2-.1-.2 0-.4.2-.5.9-.6 1.5-1.6 1.3-2.6-.2-1.1-1.1-1.6-1.2-1.7-.2-.1-.3-.4-.2-.6.1-.2.4-.3.6-.2.2.2 1.4.9 1.6 2.4.2 1.3-.5 2.7-1.7 3.4h-.2z"
        fill="#4C2C4F"
      />
      <Path
        d="M53.67 75.2c1.6-.1 3.1 1.9 3.6 3.6.9 3.4-1.9 7.5-4 7.4-1.6-.1-2.9-2.6-3.1-4.6-.3-2.9 1.4-6.3 3.5-6.4z"
        fill="#FFDDA1"
      />
      <Path
        d="M93.67 245.9c.4.8 1 1.9 1.5 3.4.7 2.2 1.4 4.4.4 6-1.2 1.8-3.9 1.9-5.4 1.9-1.2.1-3.9.1-5.5-1.7-.9-1-1.1-2.1-1.4-3.7-.3-2.1-.2-3.8-.1-4.9.4-.6 1.6-2.1 3.8-2.7 3.6-1 6.5 1.5 6.7 1.7z"
        fill="#232B44"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.37 252.401a.897.897 0 01-.4-.1c-.2-.1-.4-.3-.5-.6l-1.1-4.9c-.1-.3 0-.6.2-.8.9-.8 2.3-1.9 4.4-2.4 1.5-.3 3.2-.3 4.7.1.3.1.5.3.6.6l1.5 4.9c.068.133.1.3.1.5 0 .4-.4.8-.9.8h-.1c-1.2-.2-2.4-.2-3.5 0a12.34 12.34 0 00-4.6 1.7c-.132.133-.266.2-.4.2zm-.3-5.5l.8 3.3a15.541 15.541 0 014.2-1.4 13.064 13.064 0 012.8-.1l-1.1-3.5c-1.1-.2-2.3-.2-3.4.1-1.5.3-2.6 1-3.3 1.6z"
        fill="#FFAB4E"
      />
      <Path
        d="M148.271 249.801a.896.896 0 01-.4-.1l-5.1-3c-.4-.2-.5-.6-.3-1 .3-.8.9-1.8 2.1-2.7 1.2-.8 2.3-1.1 3.1-1.2.5 0 .9.3 1 .8 0 .4-.3.8-.8.9-.6.1-1.4.3-2.3.9-.6.4-1 .9-1.3 1.3l3.8 2.1c.333-.334.667-.634 1-.9.867-.734 1.9-1.267 3.1-1.6.4-.1.9.1 1 .6.1.4-.1.9-.6 1-.933.266-1.767.7-2.5 1.3-.4.333-.767.733-1.1 1.2-.1.2-.4.4-.7.4z"
        fill="#FFAB4E"
      />
      <Path
        d="M15.77 243.4s.4-.3 1.1-.9c.7-.7 1.7-1.6 2.7-3 1.1-1.3 2.3-3.1 3.2-5.3.468-1.066.834-2.266 1.1-3.6.2-.6.3-1.3.3-1.9.1-.7.2-1.5.1-2.2 0-2.8-.8-6-2.1-9.1-1.4-3-3.3-6.1-6-8.5-1.4-1.1-3.1-2.2-4.9-2.1h-.4s-.2.1-.3.1c-.2.1-.5.1-.7.2-.4.2-.8.4-1.1.7-.8.6-1.4 1.3-1.9 2.1-2.1 3.3-2.9 7.4-2.9 11.3.1 3.9 1.4 7.7 3.3 11 1 1.6 2.2 3.1 3.7 3.8.8.4 1.4.5 2.3.3.6-.1 1.4-.6 2-1.1 2.5-2.4 3.8-5.9 3.7-9.1-.1-3.2-1.5-6.2-3.3-8.4-.9-1.1-1.9-2.1-3-2.5-.5-.2-.9-.2-1 .1-.2.3-.4.9-.4 1.5-.3 2.3 0 4.5.2 6.2.2 1.7.3 3.1.5 4l.2 1.4-.2.1-.3-1.4c-.2-.9-.5-2.3-.9-4-.3-1.7-.7-3.8-.6-6.4 0-.6.1-1.3.5-2.1.1-.2.2-.3.5-.5.2-.2.4-.3.7-.3.2-.1.5 0 .7 0 .2 0 .4.067.6.2 1.5.6 2.6 1.6 3.6 2.8 2 2.4 3.7 5.5 3.9 9.3.1 1.8-.3 3.7-1 5.5-.6 1.7-1.7 3.5-3.2 4.9-.8.6-1.7 1.2-3 1.5-.9.2-2.3 0-3.2-.5-2-1.1-3.2-2.8-4.3-4.6-1.9-3.5-3.1-7.6-2.9-11.7.068-2.066.4-4.066 1-6 .5-2 1.3-3.9 2.4-5.6.5-.8 1.1-1.6 1.9-2.2.4-.4.9-.6 1.4-.8.2-.2.4-.2.7-.3.1 0 .2 0 .3-.1h.4c2.1-.1 4 .9 5.5 2 1.6 1.2 2.9 2.5 4 4 .6.7 1.1 1.5 1.6 2.3.4.8.9 1.5 1.2 2.4 1.5 3.2 2.2 6.5 2.2 9.6 0 .8-.1 1.5-.1 2.3-.1.8-.3 1.4-.4 2.1-.3 1.4-.9 2.7-1.4 3.8-1.1 2.2-2.4 4-3.6 5.3-1.3 1.3-2.3 2.1-3.1 2.7-.7.6-1.2.9-1.2.9l-.1-.2z"
        fill="#DBA970"
      />
      <Path
        d="M29.27 228.5c5-.933 7.5-1.7 7.5-2.3-.066-.4-1.466-.7-4.2-.9a28.53 28.53 0 012.1-1.9c-1.8-.466-3.566-.966-5.3-1.5-.066 2.2-.1 4.4-.1 6.6z"
        fill="#FFC482"
      />
      <Path
        d="M121.571 172.699c-1.5 1.7-3.5 3.7-6.1 5.4-8.4 5.7-17.5 5.5-21.3 5.2l-1.6-5.4c3.1 0 6.7-.1 10.5-.6 7.4-.9 13.6-2.7 18.5-4.6z"
        fill="#6B0047"
        opacity={0.3}
      />
      <Path
        d="M159.171 161.401c-.1 1.5-.7 3.2-3.8 5.6-3 2.2-7.8 5.2-15.4 9.9l-.1.1c-6.2 3.9-11.3 6.999-14.2 8.799-.8.467-1.433.867-1.9 1.201.1 1.5.2 3.7.3 6.4.2 3.8.4 4.6-.3 5.3-1.5 1.5-6.2.5-8.1-2.2-1.1-1.7-1-3.601-.8-5.901.2-2.8 1-4.999 1.7-6.399.067-1 .2-2.1.4-3.3.5-3.7 1.7-8.5 4-13.7a26.83 26.83 0 00.9-2c1.4-3 4.3-8.8 9.7-12.2.6-.3 8.3-5.101 16.9-2.201 4.8 1.6 11 5.901 10.7 10.601z"
        fill="#E09582"
      />
      <Path
        d="M139.871 177c-6.2 3.9-11.3 7-14.2 8.8-.6-2-2-3.7-4-4.5-1.5-.7-3.2-.8-4.7-.4.5-3.7 1.7-8.5 4-13.7a26.83 26.83 0 00.9-2c7.2-.2 13.4 2.5 16.4 7.4.6 1 1.3 2.4 1.6 4.4z"
        fill="#3C2A45"
      />
      <Path
        d="M104.471 139.9l-.8-.8c-3.3-3.6-6.5-7.3-9.4-11.1-6.1-8.1-11.4-16.9-15.7-26.2-.2-.4 0-.9.4-1.1.5-.2 1 0 1.2.4 4.2 9.2 9.4 17.9 15.5 25.9 2.6 3.4 5.5 6.8 8.4 10 4.4-8.5 6.3-17.7 5.7-26.5-.2-2.5-.6-5-1.2-7.5-.1-.5.1-.9.6-1 .4-.1.9.1 1 .6.6 2.6 1 5.2 1.2 7.8.7 9.5-1.5 19.3-6.3 28.5l-.6 1z"
        fill="#3A4852"
      />
      <Path
        d="M107.071 141.301c0 2.4-1.2 4.4-2.7 4.4-1.5 0-2.7-2-2.7-4.4 0-2.5 1.2-4.5 2.7-4.5 1.5 0 2.7 2 2.7 4.5z"
        fill="#3A4852"
      />
      <Path
        d="M70.07 153.1c-.6-1.7-1.3-2.9-2.1-3.8-4.3-4.9-13.4-5.5-23-1.9.8 2.6 1.634 5.2 2.5 7.8 2.3-1.1 5.4-2.2 9.3-2.8 5.7-.8 10.4 0 13.3.7z"
        fill="#66ABCC"
      />
      <Path
        d="M95.97 192.301c-1.2 1.9-3.9 4.5-5.9 3.9-1.8-.6-2.2-3.7-2.5-5.9-.5-3.7.2-6.8.8-8.6l-1.4-.4c-7-1.8-13.1-3-17.9-3.8-1.332-.2-2.566-.4-3.7-.6-7.4-1-12.6-1.2-18.5-5-2.8-1.8-8-5.1-8-9.4-.1-6.8 12.1-14.1 22.8-13.1 7 .6 11.6 4.7 17.8 10a78.799 78.799 0 014.2 3.9c4.3 4.4 7.7 8.8 10.3 12.8 1 1.5 1.8 2.9 2.5 4.2.5 1.3 2.5 7.2-.5 12z"
        fill="#E09582"
      />
      <Path
        d="M93.97 176.101c-.8.2-1.8.5-2.7 1-2.1 1.2-3.5 2.8-4.3 4.2-7-1.8-13.1-3-17.9-3.8.3-1.9.9-4.4 2.6-6.8 3.3-5.1 8.7-6.8 12-7.4 4.3 4.4 7.7 8.8 10.3 12.8z"
        fill="#3C2A45"
      />
    </Svg>
  )
}

export default SvgComponent
