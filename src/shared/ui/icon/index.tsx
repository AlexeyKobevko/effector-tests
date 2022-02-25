import React, { FC, SVGProps, ComponentState, useEffect, useState } from 'react';
import cn from 'classnames';

export const Icon: FC<SVGProps<SVGSVGElement>> = ({ name, className, ...props }) => {
  const [icon, setIcon] = useState<ComponentState>(null);

  useEffect(() => {
    import(`../../../assets/icons/${name}.svg`)
      .then((module) => {
        setIcon(module);
      })
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Icon with name: ${name} not found!`);
      });
  }, [name]);

  if (!icon) {
    return null;
  }

  const SvgIcon = icon.ReactComponent;

  return <SvgIcon className={cn(className)} {...props} />;
};
