import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { HeroSection } from "../../components/HeroSection";
import { Layout } from "../../components/Layout";
import { TextSection } from "../../components/TextSection";

const IndexPage = () => (
  <Layout>
    <HeroSection
      title="Company XYZ Product Database"
      subtitle={
        <>
          Insert a <i>catchy</i> database subtitle here!
        </>
      }
    >
      <ButtonGroup centre>
        <Link to="/products">
          <Button>All Products</Button>
        </Link>
      </ButtonGroup>
    </HeroSection>
    <TextSection>
      <h2>How do I do something?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis
        purus ut dolor condimentum, sit amet tempor est tincidunt. Praesent
        consequat pretium eros, in vestibulum est aliquet id. In vel odio
        ultricies, blandit neque eget, pellentesque lectus. Praesent vitae
        pellentesque odio. Suspendisse egestas sagittis lorem. Nullam quis
        sagittis ante. Aliquam sapien mi, suscipit in dolor sit amet, ornare
        vulputate nulla. Maecenas ac volutpat orci, vitae faucibus arcu. Fusce
        non purus quis nunc scelerisque viverra. Morbi interdum in magna vel
        pellentesque. Integer vel tortor gravida, eleifend nulla faucibus,
        venenatis turpis. Proin a semper nisl.
      </p>
      <p>
        Integer tincidunt libero dui, id tempus erat sagittis in. Etiam aliquet
        ex et libero tempor, id tempus risus porta. Suspendisse eget nisi ipsum.
        Fusce dapibus consequat accumsan. Suspendisse potenti. Aenean interdum
        tincidunt felis in tristique. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Vestibulum
        ornare arcu tellus, ultricies condimentum mauris fermentum eget. Sed
        dictum sapien at augue lobortis aliquet. Suspendisse a aliquet risus, ut
        hendrerit ligula. Donec pulvinar lorem id sapien vehicula, ac
        consectetur ante bibendum. Fusce vel commodo massa, non vehicula sem.
        Nam scelerisque, orci quis semper porta, diam odio consectetur turpis,
        nec mattis risus nulla non velit. Ut convallis luctus sem a fringilla.
        Cras viverra nibh eget ex blandit viverra. Integer elementum ex sit amet
        elit lacinia vulputate.
      </p>
      <p>
        Phasellus eget tincidunt ipsum, a imperdiet augue. Cras et fringilla
        odio. Ut vel condimentum dolor. Aenean ornare sit amet lorem ut auctor.
        Phasellus ultricies tincidunt eros eget convallis. Quisque iaculis
        libero nec arcu vestibulum tristique. Sed id erat ac magna volutpat
        ullamcorper. Suspendisse maximus mi eget volutpat pharetra. Mauris ac
        tincidunt turpis. Praesent id rhoncus purus, in consectetur quam.
        Quisque ultricies convallis tellus id accumsan. Pellentesque varius
        auctor turpis, ut sagittis est vestibulum a. Etiam auctor ligula non
        mauris consectetur, et consequat nunc fringilla. Integer pharetra neque
        et eros scelerisque, id ultrices velit rutrum. Maecenas mattis lacinia
        quam ut hendrerit. Integer porttitor ipsum quis sem congue, efficitur
        elementum turpis facilisis.
      </p>
      <h2>Support</h2>
      <p>
        Nulla tempor, felis ut convallis finibus, justo nunc blandit felis, ut
        ultricies mi metus sit amet nisl. Suspendisse porttitor, turpis non
        mollis ornare, ipsum diam porttitor magna, id auctor dolor quam in
        dolor. Duis vitae ligula ut urna auctor vulputate. Curabitur efficitur
        ante ut quam porta, in mollis est blandit. Integer tincidunt tortor at
        tortor dignissim lacinia. Maecenas ultricies, ante vel condimentum
        sodales, augue odio laoreet tellus, id varius mauris nibh ut erat. Nam
        quis maximus nisl. Proin at nibh vitae tortor tempus fermentum sit amet
        vel nisi. Pellentesque mattis sagittis metus. In sit amet lobortis
        velit, vestibulum efficitur turpis. Aenean vitae luctus odio. Donec
        bibendum pulvinar metus, non vulputate nulla aliquam ac. Suspendisse
        libero lectus, pellentesque id aliquam sit amet, sagittis vitae tellus.
        Praesent efficitur sagittis nisl, vel maximus eros interdum eget.
        Vestibulum tincidunt sagittis lectus.
      </p>
      <p>
        Curabitur vulputate ultricies erat interdum rhoncus. Suspendisse egestas
        magna tincidunt justo gravida convallis. Sed nec finibus lorem, eget
        viverra odio. Vestibulum in magna elit. Quisque a dictum est. In nec
        nulla sit amet magna commodo sagittis. Praesent vel ipsum vitae ipsum
        auctor tristique. Ut accumsan mollis nibh vitae sagittis. Ut lorem
        velit, porta non convallis faucibus, imperdiet eu libero.
      </p>
      <p>
        Speak to your line manager for more information, or check on our{" "}
        <a href="#">intranet site</a>.
      </p>
    </TextSection>
  </Layout>
);

export { IndexPage };
